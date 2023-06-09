import { FC } from "react";
import { Link } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { AiOutlineGithub } from "react-icons/ai";

interface footerLink {
  name: string;
  link?: any;
}

interface socialLink {
  img: any;
  link?: any;
}

export const Footer: FC = () => {
  const footerLinks: footerLink[] = [
    { name: "Blog", link: "/" },
    { name: "Docs", link: "https://docs.andex.finance/" },
    { name: "FAQs", link: "/" },
    { name: "Terms & Conditions", link: "/" },
    { name: "Privacy Policy", link: "/" },
  ];

  const socialLinks: socialLink[] = [
    { img: <AiOutlineTwitter />, link: "https://twitter.com/andexfinance" },
    { img: <BsDiscord />, link: "https://discord.gg/kmvpvBWT" },
    { img: <AiOutlineGithub />, link: "https://github.com/andex-fi/andex-ui" },
  ];
  return (
    <div className="bg-[#100618] text-white px-4 md:px-10 lg:px-40 py-20 text-center">
      <div className="lg:flex items-center justify-center gap-4">
        {footerLinks.map((footerlink, index) => (
          <Link key={index} to={footerlink.link} target={"_blank"}>
            <p
              className="text-sm mt-4 lg:mt-0"
              style={{ color: "rgba(255, 255, 255, 0.45)" }}
            >
              {footerlink.name}
            </p>
          </Link>
        ))}
      </div>
      <p className=" my-4">Stay updated! Join our Communities</p>
      <div className="flex items-center justify-center gap-5">
        {socialLinks.map((sociallink, index) => (
          <Link key={index} to={sociallink.link} target={"_blank"}>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ background: "rgba(237, 237, 237, 0.2)" }}
            >
              {sociallink.img}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
