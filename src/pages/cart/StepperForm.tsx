import { FormControl, FormHelperText, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { formUserdataI, StepperFormPropsI } from '../pages_type';
import { useStyles } from './style.cart';

const StepperForm: React.FC<StepperFormPropsI> = ({
  hendleSubmitClick,
  handleSetStateCallback,
  handleSubmit,
  errors,
  control,
}) => {
  const ref = React.useRef(undefined);
  const style = useStyles();
  React.useEffect(() => {
    hendleSubmitClick(ref);
  }, [ref]);

  return (
    <form onSubmit={handleSubmit((data: formUserdataI) => handleSetStateCallback(data))}>
      <Grid container direction="column" wrap="nowrap" spacing={2}>
        <Paper className={style.paper}>
          <Grid item xs={12}>
            <FormControl className={style.inpunFields} error={!!errors.email}>
              <InputLabel htmlFor="component-error">Email</InputLabel>
              <Controller
                className={style.inpunFields}
                as={Input}
                name="email"
                control={control}
                defaultValue=""
              />

              <FormHelperText id="component-error-text">
                {errors.email && errors.email.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={style.inpunFields} error={!!errors.phone}>
              <InputLabel htmlFor="component-error">Phone</InputLabel>
              <Controller
                as={
                  <NumberFormat
                    customInput={Input}
                    format="+7 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                  />
                }
                name="phone"
                type="phone"
                control={control}
                defaultValue=""
              />

              <FormHelperText id="component-error-text">
                {errors.phone && errors.phone.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={style.inpunFields} error={!!errors.name}>
              <InputLabel htmlFor="component-error">Name</InputLabel>
              <Controller
                className={style.inpunFields}
                as={Input}
                name="name"
                control={control}
                defaultValue=""
              />

              <FormHelperText id="component-error-text">
                {errors.name && errors.name.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Paper>
      </Grid>

      <button style={{ display: 'none' }} ref={ref} type="submit"></button>
    </form>
  );
};

export default StepperForm;
