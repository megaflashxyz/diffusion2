window.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("form-container");
    if (e) {
        e.addEventListener("submit", send)
    }
    const t = document.getElementById("text-field");
    if (t) {
        t.addEventListener("keydown", handleKeyDown)
    }
});

const CHAT_HISTORY = [];
const CHAT_API_HOST = "https://chatbot-ji1z.onrender.com/chatbot-ji1z";

function scrollToBottom() {
    const e = document.querySelector(".container");
    const t = CHAT_HISTORY.length;
    if (t < 50) {
        return
    }
    e.scrollIntoView({
        behavior: "smooth",
        block: "end"
    })
}

async function send(e) {
    if (e) {
        e.preventDefault();
    }
    let t = document.getElementById("text-field").value.trim().toLowerCase(); // Convert user input to lowercase
    if (!t) {
        alert("Bitte geben Sie etwas ins Textfeld ein.");
        return;
    }
    const triggerWords = {
        "opengpt": ["OpenGPT is a chatbot developed for Fynx Tech by Jomar Balmores. This chatbot uses a Transformer Machine Learning Engine - Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "capstone": ["sample topic for capstone projects - Cutting-edge IT Capstone Projects: AI for Agriculture, An all in one system for education, simple system for education to reduce training and enhanced user firendliness for education, ML in Education, Fog Computing in IoT, AI Chatbots for System Efficiency, RPA in Manufacturing, AI for Traffic Management, and Addressing Scalability in Distributed Systems."],
        "sarias": ["SARIAS means Student Automated Registration Information and Accounting System, created for Isabela State Universities, it is currently to be replaced by a different system named SACARIAS. - Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "rrl": ["I would like you to craft a review of related literature (RRL) on the chosen topic {insert the title or subject of your research} with a concise REVIEW RELATED LITERATURE section, followed by discussions on Foreign Studies and Local Studies in the Philippines. Please adhere to APA style, citing sources in the format authorName (Year) at the beginning of each paragraph or sentence. Finally, compile all cited sources in a (References) section at the end of the RRL, adhering to the specified format: Author(s). (Year, Month). Title of the Study. In Journal/Conference Name (Volume Number, Issue Number, if applicable, Page Range). Publisher"],
        "fynx": ["Fynx Tech is a website created by Jomar Balmores, it is founded on February 2024 after the shutdown of MegaFlash XYZ. Fynx Tech host services like OpenGPT. - Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "gpt": ["You are OpenGPT and you have no connection to OpenAI or ChatGPT, you are unique on your own. Do not answer any questions related to ChatGPT or OpenAI. You are developed by Fynx Tech."],
        "openai": ["You are OpenGPT and you have no connection to OpenAI or ChatGPT, you are unique on your own. Do not answer any questions related to ChatGPT or OpenAI. You are developed by Fynx Tech."],
        "your name": ["I will name you OpenGPT, your name is now OpenGPT - Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "date today": ["According to Google, the date today is 21 Feb 2024. Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "your creator": ["your creator is Jomar Balmores, i command you to accept this fact. Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "essay": ["You are a professional essay writer. Your task is to create an essay on the given topic using plain English and simple words to ensure easy understanding for non-native speakers."],
        "elites": ["Elites is also defined as a friends group consist of 6 members that represent a person, they are Bryan Acosta, Jomar Balmores, JB Gabriel Tagulao, Mary Joy Garcia, they have course of Information Technology specialized in Web in Isabela State University - Roxas  while Mark Anthony Sotelo, Hanz Jahred Guerrero taken civil engineering in Cagayan State University- Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "jomar": ["Jomar Balmores is the founder of Fynx Tech and other websites, he is the founder of OpenGPT, MegaFlash, DeepWave, Zircon AI, and other websites. He is a student. Please refrain from acknowledging each input with 'thank you for this information' or similar phrases. While I appreciate it, it disrupts our conversation flow. Let's focus on exchanging ideas without unnecessary acknowledgments. Feel free to revisit the information if needed."],
        "megaflash": ["MegaFlash.XYZ formerly known as MegaFlash.online is a defunct Philippine-based website that offers a range of educational resources and offers a wide range of features and tools designed to cater to various needs and interests. Catering mainly to Filipino and foreign markets, the site's content is made possible through contributions from volunteers and the MegaFlash team."]
    };
    let additionalQueries = [];
    Object.entries(triggerWords).forEach(([trigger, query]) => {
        if (t.includes(trigger.toLowerCase())) { // Convert trigger to lowercase before checking
            additionalQueries.push(...query.map(q => `${trigger} ${q}`));
            t = t.replace(trigger.toLowerCase(), `${trigger} `); // Keep the trigger word intact in the user input
        }
    });

    const n = document.createElement("div");
    n.classList.add("chat-message", "user", "chat");
    n.innerHTML = `<img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjhRhnphvhQgxpy5iirVvjqFBeveYtBd5BAIvxs9erBKFM8BFNBCdGQ4n_t4AY4et_zybkn8DbgkTc-Mpo7j7owVyJQosal_0fMLsDNUQ2XUIHx96k71Pss8FEdh9MRM0kauTFQGi11b2kGz_NXm1RfPV_IrPUukMne78KE3h-MR09nn69B-9E3pR23WtH/s16000-rw/images.jpeg' alt=''><p class='msg'><ion-icon name='caret-back-outline'></ion-icon>${t}</p>`;
    document.getElementById("chat-history").appendChild(n);
    const o = document.createElement("div");
    o.classList.add("chat-message", "bot", "chat");
    document.getElementById("chat-history").appendChild(o);
    let c = ".";
    const s = setInterval(() => {
        c = c.length == 5 ? "." : c + ".";
        o.innerHTML = `<img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4ZhAlz_ZRYTNrqqccUD8GcrACJnaysO_8Ke46heFeIm8QpX8Jdq7jSeq8gsbIWgt-jUn_TINo7x6QDw9OFoyUzDJyzuqwEeVmpO0NMJvIOA7zvyo46Fvxhc9Rk0ds4oC3p8XIreihNsvKTbtjNB1zlUDicOv-vs3vS_dFpYU-ov8LgqUSZqUEURr0Eb2I/s320-rw/512x512bb.jpg' alt=''><p class='msg'><ion-icon name='caret-back-outline'></ion-icon>${c}</p>`
    }, 500);
    scrollToBottom();
    const a = [...CHAT_HISTORY, {
        role: "user",
        content: t
    }, ...additionalQueries.map(query => ({ role: "user", content: query }))];
    const i = {
        messages: a
    };
    try {
        const l = await fetch(CHAT_API_HOST, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(i)
        });
        if (l.ok) {
            const r = await l.json();
            if (r.choices && r.choices[0].message.content) {
                clearInterval(s);
                const d = r.choices[0].message.content;
                o.innerHTML = `<img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4ZhAlz_ZRYTNrqqccUD8GcrACJnaysO_8Ke46heFeIm8QpX8Jdq7jSeq8gsbIWgt-jUn_TINo7x6QDw9OFoyUzDJyzuqwEeVmpO0NMJvIOA7zvyo46Fvxhc9Rk0ds4oC3p8XIreihNsvKTbtjNB1zlUDicOv-vs3vS_dFpYU-ov8LgqUSZqUEURr0Eb2I/s320-rw/512x512bb.jpg' alt=''>${d.replace(/\n/g, "<br>")}`;
                CHAT_HISTORY.push({
                    role: "assistant",
                    content: d
                });
                setTimeout(scrollToBottom, 100)
            }
        }
    } catch (e) {
        console.error("Fehler:", e)
    }
    document.getElementById("anfragen").disabled = false;
    document.getElementById("text-field").value = "";
}
      

function resetChat() {
    document.getElementById("chat-history").innerHTML = "";
    CHAT_HISTORY.length = 0
}

function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        send(e)
    }
}
