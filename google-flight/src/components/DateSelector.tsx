// src/components/DateSelector.tsx
import {
    Box,
    TextField,
    InputAdornment,
    Popover,
    Paper,
    Typography,
    IconButton,
} from '@mui/material';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarMonthOutlined, Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import { useState, useRef } from 'react';

interface DateSelectorProps {
    departureDate: Dayjs | null;
    returnDate: Dayjs | null;
    onDepartureDateChange: (date: Dayjs | null) => void;
    onReturnDateChange: (date: Dayjs | null) => void;
}

const DateSelector = ({
    departureDate,
    returnDate,
    onDepartureDateChange,
    onReturnDateChange
}: DateSelectorProps) => {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [activeField, setActiveField] = useState<'departure' | 'return' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalInputsRef = useRef<HTMLDivElement>(null); // Ref para los inputs del modal

    const handleDepartureClick = () => {
        setActiveField('departure');
        setCalendarOpen(true);
    };

    const handleReturnClick = () => {
        setActiveField('return');
        setCalendarOpen(true);
    };

    const handleClose = () => {
        setCalendarOpen(false);
        setActiveField(null);
    };

    const handleDateRangeChange = (newValue: [Dayjs | null, Dayjs | null]) => {
        const [start, end] = newValue;
        onDepartureDateChange(start);
        onReturnDateChange(end);

        // Close after selecting both dates
        if (start && end) {
            setTimeout(() => {
                handleClose();
            }, 300);
        }
    };

    const handleDepartureDateIncrement = (increment: number) => {
        if (departureDate) {
            const newDate = departureDate.add(increment, 'day');
            onDepartureDateChange(newDate);
        }
    };

    const handleReturnDateIncrement = (increment: number) => {
        if (returnDate) {
            const newDate = returnDate.add(increment, 'day');
            onReturnDateChange(newDate);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    flex: { xs: '1 1 100%', md: '1 1 auto' },
                    minWidth: 350,
                    ml: { md: 2 },
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    '&:hover': {
                        borderColor: '#999',
                    },
                    '&:focus-within': {
                        borderColor: '#666',
                    }
                }}
            >
                {/* Fecha de salida */}
                <Box sx={{
                    flex: '1 1 auto',
                    minWidth: 150,
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '60%',
                        width: '1px',
                        backgroundColor: '#ddd',
                    }
                }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Departure"
                        value={departureDate ? departureDate.format('MMM DD, YYYY') : ''}
                        InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthOutlined sx={{ color: '#666' }} />
                                </InputAdornment>
                            ),
                            endAdornment: departureDate ? (
                                <InputAdornment position="end">
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDepartureDateIncrement(-1);
                                            }}
                                            sx={{
                                                padding: '2px',
                                                color: '#666',
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}
                                        >
                                            <ArrowBackIos sx={{ fontSize: 12 }} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDepartureDateIncrement(1);
                                            }}
                                            sx={{
                                                padding: '2px',
                                                color: '#666',
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}
                                        >
                                            <ArrowForwardIos sx={{ fontSize: 12 }} />
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            ) : null,
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                padding: '14px 16px',
                                cursor: 'pointer',
                                height: '56px',
                                boxSizing: 'border-box',
                                backgroundColor: activeField === 'departure' ? '#e3f2fd' : 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: '#333',
                                fontWeight: 500,
                                cursor: 'pointer',
                                '&::placeholder': {
                                    color: '#666',
                                    opacity: 1,
                                    fontWeight: 400,
                                }
                            }
                        }}
                        onClick={handleDepartureClick}
                    />
                </Box>

                {/* Fecha de regreso */}
                <Box sx={{
                    flex: '1 1 auto',
                    minWidth: 150
                }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Return"
                        value={returnDate ? returnDate.format('MMM DD, YYYY') : ''}
                        InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            endAdornment: returnDate ? (
                                <InputAdornment position="end">
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReturnDateIncrement(-1);
                                            }}
                                            sx={{
                                                padding: '2px',
                                                color: '#666',
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}
                                        >
                                            <ArrowBackIos sx={{ fontSize: 12 }} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReturnDateIncrement(1);
                                            }}
                                            sx={{
                                                padding: '2px',
                                                color: '#666',
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}
                                        >
                                            <ArrowForwardIos sx={{ fontSize: 12 }} />
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            ) : null,
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                padding: '14px 16px',
                                cursor: 'pointer',
                                height: '56px',
                                boxSizing: 'border-box',
                                backgroundColor: activeField === 'return' ? '#e3f2fd' : 'transparent',
                            },
                            '& .MuiInputBase-input': {
                                color: '#333',
                                fontWeight: 500,
                                cursor: 'pointer',
                                '&::placeholder': {
                                    color: '#666',
                                    opacity: 1,
                                    fontWeight: 400,
                                }
                            }
                        }}
                        onClick={handleReturnClick}
                    />
                </Box>
            </Box>

            {/* Popover con calendarios */}
            <Popover
                open={calendarOpen}
                anchorEl={containerRef.current}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                    }
                }}
            >
                <Paper sx={{ width: 'auto', p: 2 }}>
                    {/* Header con botón de cerrar */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        borderBottom: '1px solid #eee',
                        pb: 2
                    }}>
                        <Box
                            ref={modalInputsRef}
                            sx={{
                                display: 'flex',
                                gap: 0,
                                flex: { xs: '1 1 100%', md: '1 1 auto' },
                                minWidth: 350,
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    flex: '1 1 auto',
                                    minWidth: 150, // Mismo minWidth que los inputs externos
                                    position: 'relative',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px 0 0 4px',
                                    backgroundColor: activeField === 'departure' ? '#e3f2fd' : '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '14px 16px',
                                    height: '56px',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: '#999',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        right: 0,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        height: '60%',
                                        width: '1px',
                                        backgroundColor: '#ddd',
                                    }
                                }}
                                onClick={() => setActiveField('departure')}
                            >
                                <CalendarMonthOutlined sx={{
                                    color: '#666',
                                    mr: 1,
                                    fontSize: 20
                                }} />
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            color: '#666',
                                            fontSize: '11px',
                                            lineHeight: 1
                                        }}
                                    >
                                        DEPARTURE
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#333',
                                            fontWeight: 500,
                                            fontSize: '14px'
                                        }}
                                    >
                                        {departureDate ? departureDate.format('MMM DD') : 'Add date'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    flex: '1 1 auto',
                                    minWidth: 150, // Mismo minWidth que los inputs externos
                                    border: '1px solid #ddd',
                                    borderLeft: 'none',
                                    borderRadius: '0 4px 4px 0',
                                    backgroundColor: activeField === 'return' ? '#e3f2fd' : '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '14px 16px',
                                    height: '56px',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: '#999',
                                    },
                                }}
                                onClick={() => setActiveField('return')}
                            >
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            color: '#666',
                                            fontSize: '11px',
                                            lineHeight: 1
                                        }}
                                    >
                                        RETURN
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#333',
                                            fontWeight: 500,
                                            fontSize: '14px'
                                        }}
                                    >
                                        {returnDate ? returnDate.format('MMM DD') : 'Add date'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={handleClose}
                            size="small"
                            sx={{ color: '#666' }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* DateRangeCalendar directo - sin inputs intermedios */}
                    <DateRangeCalendar
                        value={[departureDate, returnDate]}
                        onChange={handleDateRangeChange}
                        calendars={2}
                        sx={{
                            '& .MuiPickersCalendarHeader-root': {
                                paddingLeft: 1,
                                paddingRight: 1,
                            },
                            '& .MuiDayCalendar-root': {
                                width: 320, // Incrementamos de 280 a 320
                            },
                        }}
                    />
                </Paper>
            </Popover>
        </LocalizationProvider>
    );
};

export default DateSelector;
