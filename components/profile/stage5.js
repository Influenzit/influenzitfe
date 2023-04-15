import React from 'react'
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import tiktok from "../../assets/tiktok.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import { ConnectFlex } from 'styles/profile.style';
import Image from 'next/image';
import Link from 'next/link';

const Stage5 = ({user}) => {
  return (
    <div>
        <div className="let swipeIn">
            <ConnectFlex>
                <Link  href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=instagram&user=${user.id}`}>
                  <a>
                    <Image
                        src={instagram}
                        width={25}
                        height={25}
                        alt="social"
                    />
                    <span>Connect Instagram</span>
                  </a>
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=twitter&user=${user.id}`}>
                    <a>
                        <Image
                            src={twitter}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect Twitter</span>
                    </a>
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=tiktok&user=${user.id}`}>
                    <a>
                        <Image
                            src={tiktok}
                            width={25}
                            height={25}

                            alt="social"
                        />
                        <span>Connect TikTok</span>
                    </a>
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=facebook&user=${user.id}`}>
                  <a>
                    <Image
                        src={facebook}
                        width={25}
                        height={25}
                        alt="social"
                    />
                    <span>Connect Facebook</span>
                  </a>
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_API_URI}/connect?provider=google&user=${user.id}`}>
                  <a>
                    <Image
                        src={youtube}
                        width={25}
                        height={25}
                        alt="social"
                    />
                    <span>Connect Youtube</span>
                  </a>
                </Link>
            </ConnectFlex>
        </div>
    </div>
  )
}

export default Stage5