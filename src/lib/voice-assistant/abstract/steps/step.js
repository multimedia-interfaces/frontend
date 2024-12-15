export default class AbstractVoiceAssistantStep {
  constructor() {
    this.id = crypto.randomUUID();

    if (this.constructor === AbstractVoiceAssistantStep) {
      throw new Error(
        `Cannot construct instances of abstract class ${this.constructor.name}`
      );
    }
  }

  transition(context, input) {
    throw new Error(
      `Abstract method ${this.constructor.name}.${this.transition.name} not implemented`
    );
  }
}
