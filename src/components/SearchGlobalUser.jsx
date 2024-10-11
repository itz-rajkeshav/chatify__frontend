import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

export function SearchGlobalUser() {
  function handleSearch(e) {
    axios
      .get("http://localhost:3000/api/v1/search", {
        params: {
          user: e.target.value,
        },
      })
      .then((response) => {
        response.data;
        console.log(response.data);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaPlus className="text-customGreen" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <DialogDescription>
            Message Peoples through their username
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="username" className="">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Search username"
              className="col-span-3"
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Search</Button>
        </DialogFooter> */}
        {/* <p>ss</p> */}
      </DialogContent>
    </Dialog>
  );
}
