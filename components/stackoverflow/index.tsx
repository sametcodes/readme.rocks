import { use } from 'react';
import logo from './logo.png';
import Image from 'next/image';

export const Stackoverflow = () => {
    const data = use(fetch('http://localhost:3000/api/stackoverflow').then(res => res.json()));

    return (
        <div>
            <Image src={logo} alt="Stackoverflow Logo" width={30} height={30} />
            reputation: {data.reputation}
        </div>
    )
}