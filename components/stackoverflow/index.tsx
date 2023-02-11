import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const Stackoverflow = () => {
    const result = use(fetch('http://localhost:3000/api/platform/stackoverflow').then(res => res.json()));

    if (result.error) return <div>
        <Image src={logo} alt="Stackoverflow Logo" width={30} height={30} />
        Error
    </div>

    return (
        <div>
            <Image src={logo} alt="Stackoverflow Logo" width={30} height={30} />
            reputation: {result.reputation}
        </div>
    )
}