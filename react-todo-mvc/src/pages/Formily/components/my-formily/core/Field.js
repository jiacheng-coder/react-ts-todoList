// 数据层 field
export default class Field {
  constructor(name, props, form) {
    this.form = form
    this.name = name
    this.props = {...props}
    console.log(props)

    this.form.fields[name] = this 

    this.component = props.component
    this.decoractor = props.decoractor

    this.selfErrors = []

    this.value = this.form.values[name]
  }
  onInput = (e) => { 
    const newValue = e.target.value

   }
}