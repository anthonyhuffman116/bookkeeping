import React, { useEffect, useState } from 'react';
import { formatDate, useFetch } from '../Utils';

const loadReport = (from: Date, to: Date) => {
  return useFetch<ReportCategories[]>('/reports/' + formatDate(from) + '/' + formatDate(to)).then(
    (data) => data.map((x) => ({ ...x, dueDate: x.dueDate != null ? new Date(x.dueDate) : null }))
  );
};

type ReportByCategoryProps = {};

export default function ReportByCategory(_: ReportByCategoryProps) {
  const [_report, setReport] = useState<ReportCategories[]>([]);
  // TODO: isFetching thingy

  useEffect(() => {
    loadReport(new Date('2021-10-01'), new Date('2021-10-31')).then((x) => setReport(x));
  }, []);

  return <></>;
}
