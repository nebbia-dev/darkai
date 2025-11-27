export default function orderIdConverter(id: number) {
   switch(true) {
       case (id < 10):
            return 'DIGR000' + id;
       case(id < 100):
           return 'DIGR00' + id;
       case(id < 1000):
           return 'DIGR0' + id;
       default:
           return 'DIGR' + id;
   }
}