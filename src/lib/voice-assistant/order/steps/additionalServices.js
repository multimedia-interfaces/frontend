import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantConfirmationStep from "./confirmation";

const additionalServices = {
  general: 'I (am) with (*)',
  animal: '(I need) pet friendly car (*)',
  childSeat: '(I need) child seat (*)',
  both: '(I need) place for dog and baby seat (*)',
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

    const addOns = []
    if (command === additionalServices.animal || param?.includes('pet') || param?.includes('cat') || param?.includes('dog')) {
      addOns.push('animal');
    }
    if (command === additionalServices.childSeat || param?.includes('son') || param?.includes('daughter') || param?.includes('child')) {
      addOns.push('childSeat');
    }

    if (addOns.length > 0) {
      setAdditionalServices(addOns.join(', '));
      return new OrderTaxiVoiceAssistantConfirmationStep();
    }
    return new OrderTaxiVoiceAssistantAdditionalServicesStep();
  }
}
