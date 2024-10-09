#!/usr/bin/env node
import { Command } from "commander";
import csvToJson from "./commands/csvToJson.js";

const program = new Command();

program.name("myCli").description("My CLI").version("1.0.0");

program
  .command("csvToJson")
  .description("Converte um arquivo CSV em JSON")
  .action(csvToJson);

program.parseAsync();
