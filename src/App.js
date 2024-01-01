import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Switch from '@mui/joy/Switch';

import Icon from '@mdi/react';
import { mdiFilter } from '@mdi/js';
import { mdiSort } from '@mdi/js';

import Korvai from './components/Korvai';

export default function App() {
  const [checked, setChecked] = React.useState(true);
  const example1 = 'grsnd,grsndrsndp,grsndrsndpsndpmgmpdp,gmpdpmpdnd,gmpdpmpdndpdnsrgrsnd,grsndrsndp,grsndrsndpsnpdn';
  const example2 = 'g,,,r,,,s,,,n,,,d,,,g,,r,,s,,n,,d,,g,r,s,n,d,grsndn,rsndpd,sndpmg,,,m,,,p,,,d,,,p,,,g,,m,,p,,d,,p,,g,m,p,d,p,gmpdpd,mpdndn,pdnsrg,,,r,,,s,,,n,,,d,,,g,,r,,s,,n,,d,,g,r,s,n,d,grsndn,rsndpd,snpdn';
  const example3 = 'g,r,s,,gr,s,,grs,,rs,,s,,grsndrsndpsndpmg,m,p,,gm,p,,gmp,,mp,,p,,gmpdpmpdndpdnsrg,r,s,,gr,s,,grs,,rs,,s,,grsndrsndpsnpdn';

  return (
    <div className="bg-slate-300">
      <div className="flex justify-center">
        <div className="m-4 bg-zinc-50 rounded-3xl w-3/4 drop-shadow-lg">
          <div className="flex items-center gap-10 p-6 flex-wrap">
            <div className="flex items-center gap-4">
              <Icon path={mdiFilter} size={1} />
              <Select>
                <Option value="adi">Adi</Option>
                <Option value="khanda">Khanda Chapu</Option>
                <Option value="misra">Misra Chapu</Option>
                <Option value="rupakam">Rupakam</Option>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Icon path={mdiSort} size={1} />
              <Select>
                <Option value="author">Author</Option>
                <Option value="date">Date</Option>
                <Option value="length">Length</Option>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                color='neutral'
                variant='outlined'
                endDecorator={checked ? 'Ascending' : 'Descending'}
                slotProps={{
                  endDecorator: {
                    sx: {
                      minWidth: 24,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Korvai letters={example1} talam={'adi'} user={'sahasr'}/>
      <Korvai letters={example2} talam={'adi'} user={'sahasr'}/>
      <Korvai letters={example3} talam={'khanda chapu'} user={'sahasr'}/>
    </div>
  )
}