export async function POST(request: Request){
    const requestBody = await request.json();

    const playerName: string = requestBody.playerName;
    const url = `https://sky.shiiyu.moe/api/v2/profile/${playerName}`;

    const response = await fetch(url);

    const data = await response.json();
    return new Response(JSON.stringify(data));
}