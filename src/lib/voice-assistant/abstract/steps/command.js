import AbstractVoiceAssistantStep from "./step";

export default class AbstractVoiceAssistantCommandStep extends AbstractVoiceAssistantStep {
  constructor(
    questionFormulation,
    commandNotRecognizedErrorFormulation,
    commands
  ) {
    super();

    this.questionFormulation = questionFormulation;
    this.commandNotRecognizedErrorFormulation =
      commandNotRecognizedErrorFormulation;
    this.commands = commands;

    if (this.constructor === AbstractVoiceAssistantStep) {
      throw new Error(
        `Cannot construct instances of abstract class ${this.constructor.name}`
      );
    }
  }

  validateParameters(command, parameters) {
    return;
  }
}
