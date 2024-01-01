import React from 'react';
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { mdiHandClap } from '@mdi/js';

const Korvai = ({ letters, talam }) => {
  const talamMap = new Map([
    ['adi', 16],
    ['khanda chapu', 10],
    ['misra', 14],
    ['rupakam', 12]
  ]);

  const chunkArray = (array, size) => {
		const chunkedArray = [];
		const numRows = Math.ceil(array.length / size);
		for (let i = 0; i < numRows; i++) {
			const newRow = Array.from({ length: size }, (_, index) => array[i * size + index] || '');
			chunkedArray.push(newRow);
		}
	
		return chunkedArray;
	};

  const customTheme = extendTheme({
    fontFamily: {
      body: 'Be Vietnam Pro',
    },
  });

  return (
    <CssVarsProvider theme={customTheme}>
      <div className="flex justify-center">
        <div className="m-4 bg-zinc-50 rounded-3xl w-3/4 drop-shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center pb-1">
              <div className="flex">
                <Icon path={mdiAccountCircle} size={1} />
                <div className="font-viet px-2">sahasr</div>
              </div>
              {/* <div className="font-viet">date</div> */}
            </div>
            <div className="pb-1"></div>
              <Chip color="neutral" variant="outlined" startDecorator={<Icon path={mdiHandClap} size={0.7} />}>
                {talam.replace(/\b\w/g, match => match.toUpperCase())}
              </Chip>
            </div>
            <Divider sx={{m: 3}}/>
            <div className="p-4 hidden md:block">
              {chunkArray(letters.toUpperCase().split(''), talamMap.get(talam)).map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((letter, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="border border-none p-2 flex-1 font-viet text-center"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-4 block md:hidden">
              {chunkArray(letters.toUpperCase().split(''), talamMap.get(talam) / 2).map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((letter, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="border border-none p-2 flex-1 font-viet text-center"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
    </CssVarsProvider>
  );
};

export default Korvai;
