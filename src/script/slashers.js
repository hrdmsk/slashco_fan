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
            <h2>${character.name} ${character.nameJp}</h2>
            <div class="characterContainer">
                <div class="characterContainerLeft">
                    <ul>
                        <li>
                            <strong>別名:</strong>  ${character.othername}
                        </li>
                        <li>
                            <strong>クラス:</strong> ${character.class}
                        </li>
                        <li>
                            <strong>危険度:</strong> ${character.danger}
                        </li>
                    </ul>
                    <div class="status">
                        <strong>STATUS</strong>
                        <ul>
                            <li>
                                <strong>視力:</strong> ${character.STATUS.vision}
                            </li>
                            <li>
                                <strong>聴覚:</strong> ${character.STATUS.hearing}
                            </li>
                            <li>
                                <strong>速度:</strong> ${character.STATUS.speed}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="characterContainerRight">
                    <img src="${character.img}" alt="${character.name}-image" class="character-thumbnail">
                </div>
            </div>
            


            <div class="ability">
                <strong>ANGER:</strong>
                <ul>
                    <li>
                        <strong>獲得量:</strong> ${character.ANGER.gain}
                    </li>
                    <li>
                        <strong>能力:</strong> ${character.ANGER.ability}
                    </li>
                    <li>
                        <strong>詳細:</strong> ${character.ANGER.details}
                    </li>
                </ul>
            </div>
            <p class="hint"><strong>ヒント:</strong> ${character.hint}</p>
            
            <div class="accordion" id="accordion_bio">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                        <strong>詳細:</strong>
                    </button>
                    </h2>
                    <div id="collapse1" class="accordion-collapse collapse show" data-bs-parent="#accordion_bio">
                        <div class="accordion-body">
                            <strong></strong>
                            ${character.docments.bio1}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                        <strong>詳細(ネタバレ):</strong>
                    </button>
                    </h2>
                    <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#accordion_bio">
                        <div class="accordion-body">
                            <strong></strong>
                            ${character.docments.bio2}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                        <strong>添付ファイル(ネタバレ):</strong>
                    </button>
                    </h2>
                    <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#accordion_bio">
                        <div class="accordion-body">
                            <strong></strong>
                            ${character.docments.file}
                        </div>
                    </div>
                </div>
            </div>
        `;

        charactersDiv.appendChild(characterDiv);
        // リストアイテムを作成
        const listItem = document.createElement("li");
        const characterLink = document.createElement("a");
        characterLink.href = `#${character.name}`; // 名前をリンクのハッシュに
        characterLink.textContent = `${character.name}/${character.nameJp}`; // リンクテキストとして名前を設定
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
