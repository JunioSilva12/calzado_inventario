
import { Control, Controller } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { FormState } from '.';

type Props ={
  control: Control<FormState>
}

const PriceField =({control}:Props) =>(
  <Controller 
    name="price"
    defaultValue=""
    control={control}
    rules={{ required: "Campo obrigatorio" }}
    render={({field }) => (
      <CurrencyInput
        placeholder="Precio"
        className="form-control input-base"
        value={field.value}
        
        intlConfig={{ locale: 'es-CO', currency: 'COP' }}

        onValueChange={field.onChange}
      />
    )}
  />
)

export default PriceField;