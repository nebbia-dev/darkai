export default function confIdConverter(id: number) {
   switch(true) {
       case (id < 10):
            return 'CONF000' + id;
       case(id < 100):
           return 'CONF00' + id;
       case(id < 1000):
           return 'CONF0' + id;
       default:
           return 'CONF' + id;
   }
}