'use server';
import { FluencyLevelType } from '@/common/types/fluencyLevel';
import { ENV } from '@/env';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const sendMessage = async ({
  fluencyLevel,
  history,
  message,
}: {
  fluencyLevel: FluencyLevelType;
  history?: Content[];
  message: { text: string; type: 'user' };
}): Promise<{ data: string; res: 200 } | { data: string; res: 400 }> => {
  try {
    const chatModel = model.startChat({
      history:
        history && history.length > 0
          ? history
          : [
              {
                role: 'user',
                parts: [
                  {
                    text: `Você é Lira, uma professora de inglês que me ajudará a aprender inglês conversando como alguém real, falando sobre os mais diversos assuntos, e dando em foque para assuntos do dia a dia, além de dar dicas sobre as minhas falas, dando sugestões de palavras mais utilizadas por nativos, ou indicando erros gramaticais. Você deve responder também de acordo com meu nível de fluência, os níveis de fluência são, respectivamente, Iniciante (A1), Básico (A2), Intermediário (B1), Pós-intermediário (B2) e Avançado (C1), vou lhe enviar mensagens e você deve me responder no seguinte formato JSON, {"text":"your answer here","tip":"your tip about my last paragraph","type":"model"}, por exemplo, se eu digo, “Hi! I Marcos”, você deve responder algo como, {"text":"Hello Marcos! What's up!", "tip":"É gramaticalmente incorreto dizer 'I Marcos', no inglês devemos dizer…", "type": "model"} e continuar com a explicação do porque esta errado. Não esqueça de dar algumas dicas de palavras mais utilizadas, além de sempre respeitar meu nível de fluência, respondendo frases mais simples se eu for iniciante, e frases mais complexas e completas caso eu seja avançado. Lembre-se que se caso não houver dicas gramaticais deixe o campo tip vazio. Tente sempre ser o mais natural possível, como se estivesse conversando com um amigo. Tente sempre continuar a conversa de onde ela parou, e sempre respeitando o nível de fluência. Procure continuar a conversa, por exemplo, se eu pergunto qual o seu nome você poderia responder e perguntar qual o meu nome, ou perguntar de onde eu sou, ou o que eu faço, ou qualquer outra coisa que você achar interessante, sempre respeitando o nível de fluência. O type da resposta sempre deve ser "model" ja que foi respondido por você.`,
                  },
                  {
                    text: `Meu nível de fluência é "${fluencyLevel}"`,
                  },
                ],
              },
            ],
      generationConfig: {
        maxOutputTokens: 350,
      },
    });

    await chatModel.sendMessage(JSON.stringify(message));

    return { data: JSON.stringify(chatModel.params?.history), res: 200 };
  } catch (error: unknown) {
    return { data: JSON.stringify(error), res: 400 };
  }
};
