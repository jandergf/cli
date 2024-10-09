import inquirer from "inquirer";
import fs from "fs";
import figlet from "figlet";

export default async function csvToJson() {
  try {
    await printLogo();
    const { inputPath, outputPath } = await getInput();

    validatePath(inputPath);
    validatePath(outputPath);

    fs.readFile(inputPath, "utf8", (err, data) => {
      if (err) {
        console.error(`Erro ao ler o arquivo: ${err}`);
        return;
      }

      const delimiter = ";";
      const lines = data.split("\n").filter((line) => line.trim().length > 0);
      const headers = lines[0].split(delimiter);

      const jsonData = lines.slice(1).map((line) => {
        const values = line.split(delimiter);
        const obj = {};

        headers.forEach((header, index) => {
          obj[header.trim()] = values[index].trim();
        });

        return obj;
      });

      fs.writeFile(
        `${outputPath}/data.json`,
        JSON.stringify(jsonData, null, 2),
        (err) => {
          if (err) {
            console.error(`Erro ao escrever o arquivo JSON: ${err}`);
            return;
          }
          console.log(
            `Conversão concluída! Arquivo salvo em: ${outputPath}/data.json}`
          );
        }
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const printLogo = async () => {
  const asciiText = await figlet.textSync("MY CLI");
  console.log(asciiText);
};

const validatePath = (path) => {
  if (!fs.existsSync(path)) {
    console.error(`O caminho ${path} não existe.`);
    process.exit(1);
  }
};

const getInput = async () => {
  const answers = await inquirer.prompt([
    {
      name: "inputPath",
      message: "Digite o caminho do arquivo CSV:",
      type: "input",
    },
    {
      name: "outputPath",
      message: "Digite o caminho onde deseja salvar o arquivo JSON:",
      type: "input",
    },
  ]);

  return answers;
};
