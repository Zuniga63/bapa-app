import type { NextPage } from 'next';
import { useAppSelector } from 'src/store/hooks';
import { useEffect, useRef } from 'react';

import Layout from 'src/components/Layout';
import ChartJS from 'chart.js/auto';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
// import CashChart from 'src/components/dashboard/CashChart';
// import ReportStatistics from 'src/components/dashboard/ReportStatistics';
// import CreditEvolution from 'src/components/dashboard/CreditEvolution';
import { authSelector } from 'src/features/Auth';

ChartJS.register();
dayjs.extend(isLeapYear);

const Home: NextPage = () => {
  const { user, isAdmin } = useAppSelector(authSelector);
  const firtsRenderRef = useRef(true);

  useEffect(() => {
    if (firtsRenderRef.current) {
      firtsRenderRef.current = false;
      return;
    }
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="px-4 pb-40 lg:px-8">
        <div className="mb-2 flex flex-col items-center justify-center py-8 text-dark dark:text-light">
          <h1 className="m-0 text-center text-2xl leading-tight">
            Bienvenido {user?.name}
          </h1>
          <p className="mt-4 text-center text-sm leading-tight">
            Sección en continua actualización, actualmente se encuentra
            implementado el flujo de caja y el flujo de ventas.
          </p>
        </div>
        {isAdmin ? (
          <>
            {/* <div className="mb-4">
              <CreditEvolution />
            </div>
            <div className="mb-4">
              <ReportStatistics />
            </div> */}
            {/* <div className="mb-8">
              <CashChart />
            </div> */}
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
