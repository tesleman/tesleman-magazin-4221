import {
  Button,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { ListCartItem } from '../../components/AlignItemsList';
import { Layuot } from '../../components/import-export';
import { RootState, plussItmCount, minusItmCount, removeItem } from '../pages_import_export';

import { useStyles } from './style.cart';

const schema = yup.object().shape({
  name: yup.string().required('Required field name'),
  age: yup.number().required('Required field age'),
});
const Cart = () => {
  return (
    <Layuot
      baseCategory={{ category: 'Cart', link: '/cart' }}
      category="Cart"
      src={'/wishlist.jpg'}>
      <Container>
        <HorizontalLabelPositionBelowStepper />
      </Container>
    </Layuot>
  );
};

export default Cart;

function FinailStage({ userData, cart }) {
  return (
    <div>
      {JSON.stringify(userData)}
      {JSON.stringify(cart)}
    </div>
  );
}

function CartStepperItem() {
  const style = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);

  const plusHendl = React.useCallback((id: string) => dispatch(plussItmCount(id)), []);
  const minusHendl = React.useCallback((id: string) => dispatch(minusItmCount(id)), []);
  const removeHendl = React.useCallback((id: string) => dispatch(removeItem(id)), []);
  return (
    <div>
      <Grid container direction="row" justify="center">
        <Grid item xs={6}>
          {cart.map((elem) => (
            <ListCartItem
              key={elem._id}
              elem={elem}
              plusHendl={plusHendl}
              minusHendl={minusHendl}
              removeHendl={removeHendl}
            />
          ))}
        </Grid>
        <div>
          <div>All Price </div>$ {totalCartPrice}
        </div>
      </Grid>
    </div>
  );
}

function StepperForm({
  hendleSubmitClick,
  handleSetStateCallback,
  register,
  handleSubmit,
  errors,
  formState: { isDirty, isValid },
}) {
  console.log(errors, 'errors', isDirty, 'isDirty', isValid, 'isValid');
  const ref = React.useRef(undefined);

  React.useEffect(() => {
    hendleSubmitClick(ref);
  }, [ref]);

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleSetStateCallback(data))}>
        <label htmlFor="name">
          <input name="name" ref={register} />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <input name="age" type="number" ref={register} />
        {errors.age && <p>{errors.age.message}</p>}
        <button style={{ display: 'none' }} ref={ref} type="submit"></button>
      </form>
    </div>
  );
}

function HorizontalLabelPositionBelowStepper() {
  const style = useStyles();

  const [validate, setvalidate] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',

    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;
  const refer = React.useRef(undefined);
  function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }

  const handleSetStateCallback = React.useCallback((data) => {
    setUserData(data);
  }, []);
  console.log(userData, 'userData');
  const hendleSubmitClick = React.useCallback((ref) => {
    refer.current = ref.current;
  }, []);
  const hendleSubmitClickSimular = () => {
    console.log(refer.current);
    if (refer.current === undefined) {
      return;
    } else refer.current.click();
  };
  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <CartStepperItem />;
      case 1:
        return (
          <StepperForm
            hendleSubmitClick={hendleSubmitClick}
            handleSetStateCallback={handleSetStateCallback}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            formState={{ isDirty, isValid }}
          />
        );
      case 2:
        return <FinailStage cart={cart} userData={userData} />;
      default:
        return 'Unknown stepIndex';
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    hendleSubmitClickSimular();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cartCount = cart.reduce((acum, item) => acum + item.count, 0);
  const firstActive = !!cartCount && !!totalCartPrice;
  const disabledButton = () => {
    switch (activeStep) {
      case 0:
        return firstActive;
        break;
      case 1:
        return isValid;
        break;
      case 2:
        return true;
        break;
      default:
        return false;
    }
  };

  React.useEffect(() => {
    setvalidate(disabledButton());
  }, [activeStep, isValid]);

  return (
    <div className={style.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component="div" className={style.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography component="div" className={style.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={style.backButton}>
                Back
              </Button>
              <Button disabled={!validate} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
