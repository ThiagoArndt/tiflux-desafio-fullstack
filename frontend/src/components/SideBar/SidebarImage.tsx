interface SidebarImage {
  src: string;
}

function SidebarImage(props: Readonly<SidebarImage>) {
  const { src } = props;
  return (
    <div className="flex m-auto w-full mt-[77px]">
      <img alt="" src={src} className="w-[115px] mx-auto" />
    </div>
  );
}

export default SidebarImage;
