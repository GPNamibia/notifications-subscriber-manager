import React from 'react';
import { DateField ,useRecordContext} from 'react-admin';

const CustomDateField = ({ source }) => {
  const record = useRecordContext();
  const formatDate = (dateString) => {
    const options = {  year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return <span>{formatDate(record[source])}</span>;
};

export default CustomDateField;
