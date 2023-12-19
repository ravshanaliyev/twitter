"use client";

import { IUser } from "@/types";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
    const { data, status }: any = useSession();
    

    if (status == "loading")
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-sky-500" />
            </div>
        );

    return (
        <>
            {/* MOBIE SIDEBAR ACCOUNT */}
            <div className="lg:hidden block">
                <div
                    className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
                    onClick={() => signOut()}
                >
                    <RiLogoutCircleLine size={24} color="white" />
                </div>
            </div>

            {/* DESKTOP SIDEBAR ACCOUNT */}
            <Popover>
                <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={data?.currentuser?.profileImage} />
                                <AvatarFallback>{data?.currentuser?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-white">
                                <p>{data?.currentuser?.name}</p>
                                {data?.currentuser?.username ? (
                                    <p className="opacity-40">@{data?.currentuser?.username}</p>
                                ) : (
                                    <p className="opacity-40">Manage account</p>
                                )}
                            </div>
                        </div>
                        <MoreHorizontal size={24} color="white" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black border-none  rounded-2xl shadow shadow-white px-0 mb-3">
                    <div
                        className="font-bold mx-3 text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition"
                        onClick={() => signOut()}
                    >
                        Log out{" "}
                        {data?.currentuser?.username
                            ? `@${data?.currentuser?.username}`
                            : data?.currentuser?.name}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default SidebarAccount;