//@flow
import type { Node } from 'react';
export type BaseFieldProps = {
  /** @type {String} label - If present, add a label tag before the field  */
  label?: ?string | Node,

  /** @type {Object} - props to pass to label if one is present */
  labelProps?: ?Object,

  /** @type {String} className - Class for element */
  className?: ?string,

  /** @type {String} placeholder - If present, adds placeholder text for field */
  placeholder?: ?string,

  /** @type {String} error - Error to show if there's something wrong with the field */
  error?: ?(string | Node),

  /** @type {String} name - name/key value of field */
  name: string,

  /** @type {String} value - User entered value of field */
  value: string,

  /** @type {Boolean} injectOnChange - defaults to true. Injects onChange prop from <FormManager/> otherwise, no. */
  injectOnChange: boolean,

  /** @type {Function} onChange - callback to emit 'change' events. Injected by <FormManager>*/
  onChange: (SyntheticEvent<HTMLElement>) => void
};
