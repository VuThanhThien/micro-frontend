import React from "react";

interface IListItemProps {
  url: string;
  name: string;
  image: Images;
  playcount: number;
}

const ListItem: React.FC<IListItemProps> = ({
  url,
  name,
  image,
  playcount,
}) => {
  return (
    <a
      target="_blank"
      href={url}
      key={name}
      className="flex gap-4 transition-all origin-left hover:scale-105"
    >
      <img
        src={image.find((i) => i.size === "medium")!["#text"]}
        alt={name}
        className="rounded-md w-14 h-14"
      />
      <div>
        <p className="text-sm leading-none font-medium text-white/90 md:max-w-40">
          {name}
        </p>
        <p className="text-xs text-white/60 mt-1">
          {(+playcount).toLocaleString()} listeners
        </p>
      </div>
    </a>
  );
};

export default ListItem;
