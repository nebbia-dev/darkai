'use client'
import React from "react";
import {Autocomplete, Box, IconButton, InputAdornment, SxProps, TextField, Theme} from "@mui/material";
import {CountryCode, getCountries} from "libphonenumber-js";

type CountryOption = {
    code: CountryCode,
    label: string,
}

type CountrySelectProps = {
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    required?: boolean,
    sx?: SxProps<Theme>,
}

const countryNames = new Intl.DisplayNames(['en'], {type: 'region'});

const countryOptions: CountryOption[] = getCountries()
    .map((code) => ({
        code,
        label: countryNames.of(code) ?? code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

const specialFlagSrc: Partial<Record<CountryCode, string>> = {
    AC: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 513 342'%3e%3cpath fill='%230052B4' d='M0 0h513v342H0z'/%3e%3cpath fill='white' d='M440.1 181.1c-.1 39.2-6.4 81.4-57.4 101.5-51.1-20.1-57.3-62.3-57.4-101.5h114.8z'/%3e%3cpath fill='%2329DBFF' d='M439.6 197.7c-2.8 34.9-12.4 67.4-57 85-44.4-17.6-54.5-51.2-56.9-84.9'/%3e%3cpath fill='white' d='M437.8 214.1c-3.2 24.3-16.7 53.5-55.1 68.6-38.4-15.1-50.5-42.5-55.1-68.4'/%3e%3cpath fill='%2329DBFF' d='M434.2 230.3c-5.7 17.7-19.3 39.4-51.3 52.8-32-12.6-45.2-33.8-51.4-53'/%3e%3cpath fill='white' d='M426.7 246.9c-6.5 11.3-17.7 25.4-44 35.9-27.5-11.5-37.4-25.3-44-36.1'/%3e%3cpath fill='%2329DBFF' d='M412.4 265.1c-8.1 7.2-12 11.2-29.6 17.9-20.1-7.9-22.6-11.6-29.2-17.5'/%3e%3cpath fill='%235CC85C' d='M383.3 231.6c-.2-.2-27.9 35.7-27.9 35.7-1.8-1.3-10-9.5-13.3-15l41.3-50.1 40.2 49.7c-3.9 6.5-11.4 13.6-13.2 15M382.6 85.3l-26.5 45h53z'/%3e%3cellipse transform='rotate(-82.3 291.431 225.686)' fill='%23F7A226' cx='291.4' cy='225.7' rx='48.7' ry='15.7'/%3e%3cellipse transform='rotate(-68.099 303.087 164.67)' fill='%23DDC7AB' cx='303.1' cy='164.7' rx='11.7' ry='7.2'/%3e%3cellipse transform='rotate(-81.738 291.697 271.697)' fill='%23DDC7AB' cx='291.7' cy='271.7' rx='11.4' ry='3.3'/%3e%3cellipse transform='matrix(.9986 -.05353 .05353 .9986 -13.992 16.424)' fill='%23DDC7AB' cx='299.6' cy='269.4' rx='3.3' ry='11'/%3e%3cellipse transform='rotate(-21.518 314.54 201.06)' fill='%23DDC7AB' cx='314.5' cy='201.1' rx='4.1' ry='13.7'/%3e%3cellipse transform='rotate(-21.518 317.511 178.077)' fill='%23DDC7AB' cx='317.5' cy='178.1' rx='13.7' ry='4.1'/%3e%3cellipse transform='rotate(-7.7 473.781 225.857)' fill='%23F7A226' cx='473.6' cy='225.9' rx='15.7' ry='48.7'/%3e%3cellipse transform='rotate(-21.901 462.057 164.866)' fill='%23DDC7AB' cx='462' cy='164.9' rx='7.2' ry='11.7'/%3e%3cellipse transform='rotate(-8.27 473.27 271.908)' fill='%23DDC7AB' cx='473.4' cy='271.9' rx='3.3' ry='11.4'/%3e%3cellipse transform='matrix(.05353 -.9986 .9986 .05353 171.34 719.998)' fill='%23DDC7AB' cx='465.5' cy='269.6' rx='11' ry='3.3'/%3e%3cellipse transform='rotate(-68.482 450.552 201.247)' fill='%23DDC7AB' cx='450.6' cy='201.2' rx='13.7' ry='4.1'/%3e%3cellipse transform='rotate(-68.482 447.58 178.265)' fill='%23DDC7AB' cx='447.6' cy='178.3' rx='4.1' ry='13.7'/%3e%3cpath fill='%23B0C6CC' d='M373.3 130.3L356.1 155l17.8 26.1H396l4.7-25.4-5.4-25.4z'/%3e%3cpath fill='white' d='M256 0v117.4h-46.1l46.1 30.7v22.6h-22.6L160 121.8v48.9H96v-48.9l-73.4 48.9H0v-22.6l46.1-30.7H0v-64h46.1L0 22.7V0h22.6L96 48.9V0h64v48.9L233.4 0z'/%3e%3cpath fill='%23D80027' d='M144 0h-32v69.4H0v32h112v69.3h32v-69.3h112v-32H144z'/%3e%3cpath fill='%232E52B2' d='M256 22.7v30.7h-46.1z'/%3e%3cpath fill='%23D80027' d='M0 170.7v-11l62.5-42.3h22.6L7.3 170.7zM7.3.1l77.8 53.2H62.5L0 11.1V.1zM256 .1v11l-62.5 42.3h-22.6L248.7.1zm-7.3 170.6l-77.8-53.3h22.6l62.5 42.3v11z'/%3e%3c/svg%3e",
    TA: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 341.3'%3e%3cpath fill='%230052B4' d='M0 0h512v341.3H0z'/%3e%3cpath fill='white' d='M256 0v117.4h-46.1l46.1 30.7v22.6h-22.6L160 121.8v48.9H96v-48.9l-73.4 48.9H0v-22.6l46.1-30.7H0v-64h46.1L0 22.7V0h22.6L96 48.9V0h64v48.9L233.4 0z'/%3e%3cg fill='%23D80027'%3e%3cpath d='M144 0h-32v69.4H0v32h112v69.3h32v-69.3h112v-32H144z'/%3e%3cpath d='M0 0v15.1l57.4 38.3H80zm256 0v15.1l-57.4 38.3H176z'/%3e%3c/g%3e%3cpath fill='%232E52B2' d='M256 22.7v30.7h-46.1z'/%3e%3cpath d='M0 0v15.1l57.4 38.3H80zm256 0v15.1l-57.4 38.3H176z' fill='%23D80027'/%3e%3cpath fill='%232E52B2' d='M256 22.7v30.7h-46.1z'/%3e%3cpath d='M0 170.7v-15.1l57.4-38.2H80zm256 0v-15.1l-57.4-38.2H176z' fill='%23D80027'/%3e%3cpath fill='%2329DBFF' d='M448.9 169.5c0 9.6-.3 29.6-1.4 39.2-4.1 34.9-23.5 68.8-62.1 85.9-45.3-17.9-60.8-51-64.9-85.9-1.1-9.6-1.5-19.4-1.5-29l.3-47.1h129.2l.4 36.9z'/%3e%3cpath fill='white' d='M447.5 208.7c-.2 1.6-.4 3.3-.6 4.9-4.8 33.1-22.9 65.4-61.5 81-43.2-17-59.4-47.9-64.2-81-.2-1.6-.4-3.2-.6-4.9'/%3e%3cpath fill='%2329DBFF' d='M385.4 251.7l-22.9-43h45.8z'/%3e%3cpath fill='white' d='M385.4 165.8l-22.9 42.9h45.8z'/%3e%3cellipse fill='%23FFBE57' cx='474.8' cy='236.8' rx='16.8' ry='43.3'/%3e%3cellipse fill='%23FFBE57' cx='295.3' cy='236.8' rx='16.8' ry='43.3'/%3e%3cpath fill='white' d='M385.4 31.5l-33.4 44h68.5zM315.5 280s33.8 29.5 69.9 29.5 67.1-29.5 67.1-29.5l8.5 14.6S439.2 326 385.4 326 307 294.6 307 294.6l8.5-14.6z'/%3e%3cellipse fill='%23A5A5A5' cx='386.3' cy='104.3' rx='34.3' ry='23.3'/%3e%3c/svg%3e",
};

const unknownFlagSrc = "data:image/png;base64,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dHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDMtMTJUMTQ6MTY6NTArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTAzLTIwVDEwOjIyOjUxKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTIwVDEwOjIyOjUxKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmZDY2ZDIzMC1mMDk3LTRhMjUtODkxNi1mN2YxMmQ2NTRhNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZmQ2NmQyMzAtZjA5Ny00YTI1LTg5MTYtZjdmMTJkNjU0YTY5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmQ2NmQyMzAtZjA5Ny00YTI1LTg5MTYtZjdmMTJkNjU0YTY5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmZDY2ZDIzMC1mMDk3LTRhMjUtODkxNi1mN2YxMmQ2NTRhNjkiIHN0RXZ0OndoZW49IjIwMjItMDMtMTJUMTQ6MTY6NTArMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjHOcacAAAMOSURBVFiFzZixa1NBHMe/FxOIryWNNUkjJCYQkhJKU2oXsdJowU7t6KZroYNDB7eOgn+Dg0t10MmhrhUUEelm2hDaUmibQBtbQxuaI5JHn4O8cHe59/LuRY3fJbnj97vf5373vSOEzC8t4+W9mcUNzfcc/6mSw9H38U9rzx4d1ndJ9e27xa3Q0It+QznR1MbHjEfsbL1Bu35XjZflqtYBgPLMwgpZX/9gWEbYqN6gCAxofzVPjKWU1jyU0pos0MnYSddFBQa0rh1nY1lpmjbskSWJgbKOpBJJgy3OFmTjZcedSiQNuxyrDVBKaxxwt6R6g6LeoEglksZ4bozcvnO3PW91zOa8uVY6k8Z4boykM2lpvKxpLIenI8NmAwAwNTmB8dwYAQDN78Pcgznp5mQQU5MTiMdiAIB4LIbpfL4jT1bTnOMsIR6t1edZ7Zy7pCa06E0xbzqfb8OaOt4/4NbqVptSWlN+Jczjn529z83TZgtfv3zm7MHChgODXPxmoWjsHewT1ZeGFL5tXSplADg5/U7CoYhhWsOU3tJRKm1zDYgmE0SELVcq2N3ZRTgUUX5SXQGzsoNOZTJE8/s6YEVbqcj20rEyRjxENr9ZKHLFvT4vUpkMiSYTfxwWkACzYOx3Ur20LLRZKBp6S2+PNb+vw7PdYMWGWDWoZ0uwkllA5ute5NgSweEhaed7FbuubCxKCixLYo9TZg9Zd4HfnhYvptW6srHYHCmw6sXIZkc5WL2lgzZbXIwI7fSUxOY4toSVstlR4vV5ublSadvY29nhLiLAQ9tdYjvZAlu9GFawektHuVLhwGWd7uZTu+6Tw3LZ1U7F3wUAOFhWN0aiEE/BKrabXFlCBRYAjqrHEO0Rj8XgDwSVaysDXw+NdMw56ZYM+tpVv2p5deAfp1Wc1C/aY5WjZaFps4Wj6rFqefce9geCaNbP3KT2lOv6WXNbsNfcnt/hfy1POBJd7TeEU50fVlevPB3wFH/mbj3pN4wTRdbePCTzS8t4fTOQLs8srBiD/sf9hpKJXDRfmX8G/gKUwMkA3my/NwAAAABJRU5ErkJggg==";

function getFlagSrc(countryCode: CountryCode) {
    return specialFlagSrc[countryCode] ?? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.webp`;
}

export default function CountrySelect({
    value,
    onChange,
    placeholder = "Select your state",
    required = false,
    sx,
}: CountrySelectProps) {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const normalizedValue = value.trim().toLowerCase();
    const selectedOption: CountryOption | null = countryOptions.find((option) =>
        option.label.toLowerCase() === normalizedValue
        || option.code.toLowerCase() === normalizedValue
    ) ?? null;

    return (
        <Autocomplete<CountryOption, false, false, false>
            autoHighlight
            openOnFocus
            fullWidth
            options={countryOptions}
            value={selectedOption}
            open={open}
            noOptionsText="No country found"
            isOptionEqualToValue={(option, currentValue) => option.code === currentValue.code}
            getOptionLabel={(option) => option.label}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(_, newValue) => onChange(newValue?.label ?? '')}
            renderOption={(props, option) => {
                const {key, ...optionProps} = props;

                return (
                    <Box component="li" key={key} {...optionProps} sx={{display: 'flex', alignItems: 'center', gap: 1.25, fontSize: '0.875rem'}}>
                        <Box
                            component="img"
                            src={getFlagSrc(option.code)}
                            alt={`${option.label} flag`}
                            loading="lazy"
                            sx={{
                                width: 20,
                                height: 15,
                                objectFit: 'cover',
                                borderRadius: '2px',
                                flexShrink: 0,
                            }}
                        />
                        <span>{option.label}</span>
                    </Box>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required={required}
                    placeholder={placeholder}
                    inputRef={inputRef}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start" sx={{flexShrink: 0}}>
                                <IconButton
                                    aria-label="Open flags menu"
                                    aria-haspopup="listbox"
                                    aria-expanded={open ? 'true' : 'false'}
                                    edge="start"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => {
                                        inputRef.current?.focus();
                                        setOpen(true);
                                    }}
                                    sx={{aspectRatio: '1 / 1'}}
                                >
                                    <Box
                                        component="img"
                                        src={selectedOption ? getFlagSrc(selectedOption.code) : unknownFlagSrc}
                                        alt={selectedOption ? `${selectedOption.label} flag` : 'unknown'}
                                        loading="lazy"
                                        sx={{
                                            width: 26,
                                            height: 'auto',
                                            display: 'block',
                                            objectFit: 'cover',
                                            borderRadius: '2px',
                                            flexShrink: 0,
                                        }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
            sx={{
                width: 1,
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#e7e5e4',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    padding: '0 0 0 1.5rem',
                    '& fieldset': {
                        borderWidth: '0px',
                    },
                    '& .MuiAutocomplete-input': {
                        paddingLeft: 0
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid #171717',
                    },
                },
                '& .MuiInputBase-input': {
                    color: '#171717',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    paddingRight: '1rem',
                    paddingLeft: 0,
                    '&::placeholder': {
                        fontSize: '0.875rem',
                        opacity: 0.5,
                    },
                },
                '& .MuiAutocomplete-popupIndicator': {
                    color: '#171717',
                },
                '& .MuiAutocomplete-clearIndicator': {
                    display: 'none',
                },
                '& .MuiAutocomplete-endAdornment': {
                    right: '9px',
                },
                ...sx,
            }}
        />
    )
}
