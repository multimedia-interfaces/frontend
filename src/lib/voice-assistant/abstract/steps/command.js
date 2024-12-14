import AbstractVoiceAssistantStep from "./step";

export default class AbstractVoiceAssistantCommandStep extends AbstractVoiceAssistantStep {
  constructor(
    name,
    questionFormulation,
    commandNotRecognizedErrorFormulation,
    commands
  ) {
    super(name);

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
    throw new Error(
      `Abstract method ${this.constructor.name}.${this.validateParameters.name} not implemented`
    );
  }
}
