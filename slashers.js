fetch('characters.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const charactersDiv = document.getElementById("characters");
    const characterList = document.createElement("ul"); // リストを作成
    
    data.characters.forEach(character => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "character";
        characterDiv.id = character.name; // IDを設定
        characterDiv.innerHTML = `
            <h2>${character.name}</h2>
            <p><strong>視力:</strong> ${character.vision}</p>
            <p><strong>クラス:</strong> ${character.class}</p>
            <p><strong>聴覚:</strong> ${character.hearing}</p>
            <p><strong>危険度:</strong> ${character.danger}</p>
            <p><strong>速度:</strong> ${character.speed}</p>
            <div class="ability">
                <strong>ANGER:</strong>
                <p><strong>獲得量:</strong> ${character.ANGER.gain}</p>
                <p><strong>能力:</strong> ${character.ANGER.ability}</p>
                <p><strong>詳細:</strong> ${character.ANGER.details}</p>
            </div>
            <p class="hint"><strong>ヒント:</strong> ${character.hint}</p>
        `;

        charactersDiv.appendChild(characterDiv);
        // リストアイテムを作成
        const listItem = document.createElement("li");
        const characterLink = document.createElement("a");
        characterLink.href = `#${character.name} `; // 名前をリンクのハッシュに
        characterLink.textContent = character.name; // リンクテキストとして名前を設定
        listItem.appendChild(characterLink);
        characterList.appendChild(listItem); // リストアイテムをリストに追加
    });
    // キャラクターリストをページに追加
    charactersDiv.prepend(characterList);
})
.catch(error => {
    const charactersDiv = document.getElementById("characters");
    charactersDiv.innerHTML = `<p style="color: red;">エラーが発生しました: ${error.message}</p>`;
    console.error('Error fetching JSON:', error);
});
