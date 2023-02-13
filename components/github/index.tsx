import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';
import qs from 'querystring';

export const GitHub = () => {
    const method = "getContributions";
    const query = qs.stringify({method});

    const result = use(fetch(`http://localhost:3000/api/platform/github?${query}`).then(res => res.json()));

    if(result.error){
        console.log("github", result)
        return <div>
            <Image src={logo} alt="GitHub Logo" width={30} height={30} />
            Error
        </div>
    }

    return (
        <div>
            <Image src={logo} alt="GitHub Logo" width={30} height={30} />
            totalContributions: {result.data.user.contributionsCollection.contributionCalendar.totalContributions}
        </div>
    )
}