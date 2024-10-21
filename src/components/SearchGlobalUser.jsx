import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";

export function SearchGlobalUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { Id } = useSelector((state) => {
    return state.User;
  });
  // console.log(`sender id ${Id}`);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get("http://localhost:3000/api/v1/search", {
          params: {
            user: searchTerm,
          },
        })
        .then((response) => {
          console.log("API response:", response.data);
          setUsers(response.data.users || []);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setUsers([]);
        });
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }
  const sendConcoMemeberId = async (ReceiverId) => {
    const data = {
      startUserId: Id,
      ConvoStartUser: Id,
      ReceivedUser: ReceiverId,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/convoMember",
        data
      );
      console.log(response.data);

      toast.success(`${response.data.data}🙂`, {
        transition: Bounce,
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
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
              Message people through their username
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
                value={searchTerm}
              />
            </div>
          </div>
          <DialogFooter>
            {users.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {users.map((user, index) => (
                  <Button
                    key={user._id}
                    variant="outline"
                    className="hover:bg-customGreen hover:text-white"
                    onClick={() => sendConcoMemeberId(user._id)}
                  >
                    {user.userName}
                  </Button>
                ))}
              </div>
            ) : (
              <p>
                {searchTerm ? "No users found" : "Enter a username to search"}
              </p>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
