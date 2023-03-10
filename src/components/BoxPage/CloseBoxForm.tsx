import { Button, Modal, NumberInput, Textarea } from '@mantine/core';
import { IconLock } from '@tabler/icons';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  boxPageSelector,
  closeBox,
  unmountBoxToClose,
} from 'src/features/BoxPage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IValidationErrors } from 'src/types';
import { currencyFormat } from 'src/utils';

function CloseBoxForm() {
  const [opened, setOpened] = useState(false);
  const [cash, setCash] = useState<number | undefined>(undefined);
  const [observation, setObservation] = useState('');
  const [leftover, setLeftover] = useState(0);
  const [missing, setMissign] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [errors, setErrors] = useState<IValidationErrors | null>(null);

  const {
    boxToClose: box,
    closeBoxIsSuccess: isSuccess,
    closeBoxError: error,
    closeBoxLoading: loading,
  } = useAppSelector(boxPageSelector);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    if (!loading) {
      setCash(undefined);
      setObservation('');
      setErrors(null);
      setOpened(false);
      setTimeout(() => {
        dispatch(unmountBoxToClose());
      }, 150);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (box && typeof cash !== 'undefined') {
      const data = {
        boxId: box.id,
        cash,
        observation: observation || undefined,
      };
      dispatch(closeBox(data));
    }
  };

  const formater = (value: string | undefined) => {
    let result = '$ ';
    if (value && !Number.isNaN(parseFloat(value))) {
      result = `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return result;
  };

  useEffect(() => {
    if (box) setOpened(true);
    else setOpened(false);
  }, [box]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`¡Caja cerrada con éxito!`);
      closeHandler();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      const { data, status } = error;
      if (status === 400 && data.errors) {
        setErrors(data.errors);
      } else if (status === 401) {
        toast.error(data.errorMessage);
      } else {
        console.log(error);
      }
    }
  }, [error]);

  useEffect(() => {
    setLeftover(0);
    setMissign(0);

    if (
      typeof cash !== 'undefined' &&
      cash >= 0 &&
      box &&
      typeof box.balance !== 'undefined'
    ) {
      setEnabled(true);

      if (cash > box.balance) setLeftover(cash - box.balance);
      else if (cash < box.balance) setMissign(box.balance - cash);
    } else {
      setEnabled(false);
    }
  }, [cash]);

  return (
    <Modal opened={opened} onClose={closeHandler} size="sm">
      <form onSubmit={submitHandler}>
        <header>
          <h2 className="text-center text-xl font-bold"> {box?.name}</h2>
        </header>
        <div className="mb-2">
          <NumberInput
            label="Dinero"
            required
            placeholder="Escribe la base aquí"
            hideControls
            min={0}
            step={100}
            value={cash}
            onChange={value => setCash(value)}
            onFocus={({ target }) => target.select()}
            error={errors?.cash?.message}
            parser={value => value?.replace(/\$\s?|(,*)/g, '')}
            formatter={formater}
          />
          <Textarea
            label="Observación"
            placeholder="Una observación del cierre de caja"
            onChange={({ target }) => setObservation(target.value)}
            error={errors?.observation?.message}
          />

          <div className="min-h-[60px]">
            <p>
              Saldo: <span>{currencyFormat(box?.balance)}</span>
            </p>
            {!!leftover && (
              <p>
                Sobrante: <span>{currencyFormat(leftover)}</span>
              </p>
            )}
            {!!missing && (
              <p>
                Faltante: <span>{currencyFormat(missing)}</span>
              </p>
            )}
          </div>
        </div>
        <footer className="flex items-center justify-end">
          <Button
            leftIcon={<IconLock />}
            loading={loading}
            type="submit"
            disabled={!enabled}
          >
            Cerrar Caja
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

export default CloseBoxForm;
