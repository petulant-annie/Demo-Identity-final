import { State, Schema, Type } from 'quantizer';
import { IInitialState, initialState } from '../reducers/demoReducers';

const DemoSchema = new Schema('demoSchema', {
  checkboxes: Type.Any,
  showPreloader: Type.Boolean,
  error: Type.Boolean,
  value: Type.Map,
  commentValue: Type.String,
  request: Type.Boolean,
});

export class DemoModel extends State.Map<IInitialState> {
  static schema = DemoSchema;

  constructor(props: IInitialState) {
    super();

    this.set(initialState);

    if (props) {
      this.merge(initialState);
    }
  }
}
