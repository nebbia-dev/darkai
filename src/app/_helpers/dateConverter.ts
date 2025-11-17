export default function dateConverter(isoString: string | Date) {
    const isodate = new Date(isoString);
    return isodate.toLocaleDateString('it-IT');
}