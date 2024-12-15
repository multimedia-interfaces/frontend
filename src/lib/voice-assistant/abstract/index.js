export default class AbstractVoiceAssistant {
  constructor() {
    if (this.constructor === AbstractVoiceAssistant) {
      throw new Error(
        `Cannot construct instances of abstract class ${this.constructor.name}`
      );
    }
  }

  initialize() {
    throw new Error(
      `Abstract method ${this.constructor.name}.${this.initialize.name} not implemented`
    );
  }
}
