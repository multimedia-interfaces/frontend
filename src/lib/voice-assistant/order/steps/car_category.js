import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantConfirmationStep from "./confirmation";
import OrderTaxiVoiceAssistantAdditionalServicesStep from "./additionalServices";

const carCategories = {
  econom: 'Economy (*)',
  standard: 'Standard (*)',
  business: 'Business (*)',
}

export default class OrderTaxiVoiceAssistantCarCategoryStep extends AbstractVoiceAssistantCommandStep {
  constructor(fromRepeat, questionFormulationOverwride) {
    super(
        questionFormulationOverwride || "Which car category do you prefer?",
        "Can you repeat please?",
      ["I prefer *", "I would like (*) category", Object.values(carCategories)]
    );

    this.fromConfirmation = fromRepeat;
  }

  transition({ setCarCategory }, { parameters: [category], command}) {
    console.log('VoiceAssistantCarCategoryStep', {command, category});

    const nextStep = this.fromConfirmation
        ? new OrderTaxiVoiceAssistantConfirmationStep()
        : new OrderTaxiVoiceAssistantAdditionalServicesStep();

    if (command === carCategories.econom || category?.includes('econ')) {
      setCarCategory('econom');
      return nextStep;
    }
    if (command === carCategories.standard || category?.includes('stan')) {
      setCarCategory('standard');
      return nextStep;
    }
    if (command === carCategories.business || category?.includes('busin')) {
      setCarCategory('business');
      return nextStep;
    }
    const questionFormulationOverwride = `Please, choose one of the following options: ${Object.values(carCategories).join(', ')}`;

    return new OrderTaxiVoiceAssistantCarCategoryStep(this.fromConfirmation, questionFormulationOverwride);
  }
}
