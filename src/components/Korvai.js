import { React, useState } from 'react';
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { mdiHandClap } from '@mdi/js';
import { mdiMusic } from '@mdi/js';

const Korvai = ({ letters, talam, ragam, description, authorName, createdAt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const talamMap = new Map([
    ['adi', 16],
    ['khanda chapu', 10],
    ['misra', 14],
    ['rupakam', 12]
  ]);

  const formatDate = (date) => {
    const month = (1 + date.getMonth()).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear().toString().slice(-2);
    return `${month}-${day}-${year}`;
  };

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    const numRows = Math.ceil(array.length / size);
    for (let i = 0; i < numRows; i++) {
      const newRow = Array.from({ length: size }, (_, index) => array[i * size + index] || '');
      chunkedArray.push(newRow);
    }
    return chunkedArray;
  };

  const customTheme = extendTheme({});

  const rows = chunkArray(letters.replace(/\s/g, "").toUpperCase().split(''), talamMap.get(talam));
  const mobileRows = chunkArray(letters.replace(/\s/g, "").toUpperCase().split(''), talamMap.get(talam) / 2);
  const isLong = rows.length > 4;
  const displayRows = isExpanded ? rows : rows.slice(0, 4);
  const displayMobileRows = isExpanded ? mobileRows : mobileRows.slice(0, 4);

  return (
    <CssVarsProvider theme={customTheme}>
      <div className="flex justify-center">
        <div className="m-4 bg-zinc-50 rounded-3xl w-3/4 drop-shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center pb-1">
              <div className="flex">
                <Icon path={mdiAccountCircle} size={1} />
                <div className="font-semibold px-2">{authorName}</div>
              </div>
              <div className="text-slate-400">{createdAt && formatDate(createdAt)}</div>
            </div>
            <Chip color="neutral" variant="outlined" startDecorator={<Icon path={mdiHandClap} size={0.7} />} sx={() => ({mx: '2px'})}>
              {talam.replace(/\b\w/g, match => match.toUpperCase())}
            </Chip>
            <Chip color="neutral" variant="outlined" startDecorator={<Icon path={mdiMusic} size={0.7} />} sx={() => ({mx: '2px'})}>
              {ragam.replace(/\b\w/g, match => match.toUpperCase())}
            </Chip>
          </div>
          <div className="mx-6">
            {description}
          </div>
          <Divider sx={{m: 3}}/>
          <div className="p-4 hidden md:block pb-8">
            {displayRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="border border-none p-2 flex-1 font-swaram font-bold text-center"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
            {isLong && (
              <div className="text-center mt-4">
                <Button
                  variant="soft"
                  color="neutral"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              </div>
            )}
          </div>
          <div className="p-4 block md:hidden pb-8">
            {displayMobileRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="border border-none p-2 flex-1 font-swaram font-bold text-center"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
            {isLong && (
              <div className="text-center mt-4">
                <Button
                  variant="soft"
                  color="neutral"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CssVarsProvider>
  );
};

export default Korvai;
