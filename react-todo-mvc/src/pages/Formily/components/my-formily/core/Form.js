import Field from "./Field";
import { observable, define } from "@formily/reactive";

export default class Form {
  constructor(props) {
    this.initialize(props);
    this.makeObservable();
  }
  initialize = (props) => {
    this.props = { ...props };
    this.initialValues = props.initialValues;
    this.fields = {};
    this.values = { ...props.initialValues };
  };
  makeObservable = () => {
    define(this, {
      fields: observable.shallow,
      values: observable,
    });
  };
  createField = (props) => {
    const { name } = props;
    if (!this.fields[name]) {
      new Field(name, props, this);
    }
    return this.fields[name];
  };
  onMount = () => {};
  onUnmount = () => {};
  submit = () => {};
}
