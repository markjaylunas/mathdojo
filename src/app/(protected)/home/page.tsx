import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      Home Page
      <Link href={"/classic"}>
        <Button>Classic</Button>
      </Link>
    </div>
  );
};

export default HomePage;
