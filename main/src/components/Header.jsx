import Link from 'next/link';

const Header = () => {
    return (
        <div className='border border-red-100 mx-4 md:mx-[300px] mb-12'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <h1 className='text-xl font-bold mb-4 md:mb-0'>StockSaver</h1>
                <div>
                    <nav>
                        <ul className='flex flex-col md:flex-row w-full md:w-auto gap-y-4 md:gap-x-8'>
                            <li><Link href="#/">Home</Link></li>
                            <li><Link href="#/">About</Link></li>
                            <li><Link href="#/">Contact us</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
