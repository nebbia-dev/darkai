export default function dateConverter(isoString: string) {
    const isodate = new Date(isoString);
    return isodate.toLocaleDateString('it-IT');
}