import { API_URL1 } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "./ui/button";

function VideoCall() {
  const [socket, setsocket] = useState(null);
  const [peerConnection, setpeerConnection] = useState(null);
  const localvideoRef = useRef(null);
  const remotevideoRef = useRef(null);
  const configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  useEffect(() => {
    const newsocket = io(API_URL1);
    setsocket(newsocket);
    const newPeerConnection = new RTCPeerConnection(configuration);
    setpeerConnection(newPeerConnection);
    newsocket.on("offer", async (data) => {
      await newPeerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await newPeerConnection.createAnswer();
      await newPeerConnection.setLocalDescription(answer);
      newsocket.emit("answer", {
        target: data.sender,
        answer,
      });
    });
    newsocket.on("answer", async (data) => {
      await newPeerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    });
    newsocket.on("ice-candidate", async (data) => {
      try {
        await newPeerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      } catch (error) {
        console.log("error in the ice candidate ", error);
      }
    });
    return () => {
      newsocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            target: "target-peer-id",
            candidate: event.candidate,
          });
        }
      };
      peerConnection.ontrack = (event) => {
        remotevideoRef.current.srcObject = event.streams[0];
      };
    }
  }, [peerConnection, socket]);
  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localvideoRef.current.srcObject = stream;

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("offer", {
      offer,
      sender: socket.id,
      target: "target-peer-id",
    });
  };
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Video Call</h1>
      <div className="relative">
        <video
          ref={localvideoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-2xl rounded-lg shadow-lg"
        />
        <video
          ref={remotevideoRef}
          autoPlay
          playsInline
          className="absolute top-4 right-4 w-48 rounded-lg shadow-lg"
        />
      </div>
      <Button
        className="w-32 h-12 bg-blue-600 hover:bg-blue-700"
        onClick={startCall}
      >
        Start Call
      </Button>
    </div>
  );
}

export default VideoCall;
