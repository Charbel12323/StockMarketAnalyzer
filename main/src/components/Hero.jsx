import Link from "next/link";


const Hero = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Lets Get Started</h1>
            <div className="mx-[1000px]">

                <p>
                    Sure! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. This is because honey has natural preservatives like low water content and acidic pH that inhibit the growth of bacteria and microorganisms. Additionally, honey's unique chemical composition, including hydrogen peroxide, contributes to its long shelf life. Beyond its longevity, honey has been used for millennia not just as a sweetener but also for its medicinal properties, from soothing sore throats to aiding digestion. Its versatility and durability make it a fascinating topic in the world of food science and history.

                </p>

            </div>
            <button className="bg-red-400 border rounded-xl p-5"><Link href="/signup">Sign up</Link></button>


        </div>
    )
}

export default Hero
