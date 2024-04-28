export default async function Home() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>xeep.me puzzles</title>
        <meta name="description" content="xeep.me puzzles" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className="w-full h-screen bg-[#17101f]">
        <div class="w-full h-full p-8">
          <div class="flex flex-col items-center mt-16">
            <img
              src="/xeepme.png"
              alt="xeep tools logo"
              width="200"
              class="rounded-full border-4 border-white"
            />
            <h1 class="font-bold text-4xl text-white pt-4">Xeep Puzzles</h1>
          </div>

          <div class="flex flex-col items-center mt-32">
            <a
              href="https://warpcast.com/masooda/0x59277fd3"
              target="_blank"
              class="h-full flex items-center justify-center xl:w-[50%] w-[80%]"
            >
              <img
                src="/linket-splash.png"
                alt="Linklet game image"
                class="self-center rounded-md"
              />
            </a>
            <div>
              <a href="https://warpcast.com/masooda/0x59277fd3" target="_blank">
                <div class="bg-purple-800 p-4 text-white rounded-md my-4 text-xl font-medium block">
                  Play Linklet now on Warpcast ↯
                </div>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
