import { Image } from "@chakra-ui/react"

function dateDifferences(timeStamp: string) : string
{
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    const givenDate = new Date(timeStamp);
    const currentDate = new Date();

    const differenceInMs = currentDate.getTime() - givenDate.getTime();

    const differenceInSec = Math.floor(differenceInMs/1000);
    const differenceInMin = Math.floor(differenceInSec/60);
    const differenceInHour = Math.floor(differenceInMin/60);
    const differenceInDays = Math.floor(differenceInHour/24);

    if(differenceInDays > 30)
        {
            const date = givenDate.getUTCDate();
            const month = givenDate.getUTCMonth();

            return date + " " + monthNames[month];
        }

    if(differenceInDays > 0)
        {
            return differenceInDays + "d";
        }
    
    if(differenceInHour > 0)
        {
            return differenceInHour + "h";
        }

    if(differenceInMin > 0)
        {
            return differenceInMin + "m";
        }
    
        return differenceInSec + "s";
}

function imageCircle(img : string, size : string)
{
    return <Image 
    borderRadius={'50%'}
    width={size}
    height={size}
    objectFit={'cover'}
    src={img}/>
}

function imageMessage(img : string)
{
    return <Image 
    width={'420px'}
    borderRadius={'4px'}
    src={img}/>
}

export default {dateDifferences, imageCircle, imageMessage}
