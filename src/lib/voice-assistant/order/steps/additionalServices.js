import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantConfirmationStep from "./confirmation";

const additionalServices = {
  general: 'I (am) with (*)',
  animal: '(I need) pet friendly car (*)',
  childSeat: '(I need) child seat (*)',
  both: '(I need) place for dog and baby seat (*)',
  none: 'No (*)',
};

export default class OrderTaxiVoiceAssistantAdditionalServicesStep extends AbstractVoiceAssistantCommandStep {
  constructor() {
    super(
      "Do you need any additional services?",
      "Please, repeat",
      Object.values(additionalServices)
    );
  }

  transition({ setAdditionalServices }, { command, parameters: [param] }) {
    console.log('AdditionalServicesStep', {command, param});

    if (command === additionalServices.none) {
      setAdditionalServices([]);
      return new OrderTaxiVoiceAssistantConfirmationStep();
    }

    const addOns = []
    if (command === additionalServices.animal || param?.includes('pet') || param?.includes('at') || param?.includes('dog')) {
      addOns.push('animal');
    }
    if (command === additionalServices.childSeat || param?.includes('son') || param?.includes('daughter') || param?.includes('child')) {
      addOns.push('child-seat');
    }
    if (command === additionalServices.both) {
      addOns.push('animal', 'child-seat');
    }

    if (addOns.length > 0) {
      setAdditionalServices(addOns);
      return new OrderTaxiVoiceAssistantConfirmationStep();
    }
    return new OrderTaxiVoiceAssistantAdditionalServicesStep();
  }
}
