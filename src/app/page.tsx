import SearchForm from "@/components/form/SearchForm";

export default function Home() {
  return (
    <div className="w-full h-screen flex sm:items-center">
      <div
        className="bg-[url('/assets/Image_2x.png')] rounded-none w-full h-[520px] absolute bottom-0 bg-235% bg-no-repeat bg-top sm:w-[438px] sm:h-[85%] sm:right-[9%] sm:bottom-auto sm:rounded-3xl lg:bg-left lg:bg-150% lg:w-[632px] xl:w-[909px] xl:bg-center xl:bg-contain 2xl:w-[1518px]"
        style={{ backgroundImage: "url('/assets/Image_2x.png')" }}
      ></div>
      <SearchForm />
    </div>
  );
}
