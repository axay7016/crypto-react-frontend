import React from 'react'
import { TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import subMonths from 'date-fns/subMonths'
const FromDatePicker = ({ handleFilter, setStartDateTime, startDateTime, from_date }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField className='dtPickerMyBets' variant="standard"
                    sx={{
                        svg: { color: '#fff' },
                        input: { color: '#fff' },
                    }}
                    {...props} />}

                onChange={(value) => {
                    if (value == 'Invalid Date') {
                        return
                    } else {
                        setStartDateTime(value)
                    }
                }
                }
                value={startDateTime}
                inputRef={from_date}
                views={['day', 'month', 'year']}
                ampm={false}
                inputFormat="yyyy-MM-dd"
                InputProps={{
                    disableUnderline: true
                }}
                onClose={handleFilter}
                minDate={subMonths(new Date(), 3)}
            />
        </LocalizationProvider>
    )
}

export default FromDatePicker