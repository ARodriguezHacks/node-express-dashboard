describe('services/select-file-service.js', () => {
  const source = fs.readFileSync(path.join(process.cwd(), 'services/select-file-service.js'), 'utf8');
  const selectFileService = jscs(source);

  it('should contain fs and path require @select-file-service-require', () => {
    const isDirectory = selectFileService.findFunction("isDirectory")
    const fileInfo = isDirectory.findVariable("fileInfo")

    const fileInfoMatch = {
      "init.callee.object.name": "fs",
      "init.callee.property.name": "statSync",
      "init.arguments[0].arguments[1].name": "file",
      "init.arguments[0].arguments[0].name": "currentDir",
      "init.arguments[0].original.callee.object.name": "path",
      "init.arguments[0].original.callee.property.name": "join"
    }
    assert(fileInfo.length && matchObj(fileInfo, fileInfoMatch),
      "Are you importing `path` and assigning it to a `const` named `path`")

    const returnStatement = isDirectory.findReturn()
    const returnStatementMatch = {
      "argument.callee.object.name": "fileInfo",
      "argument.callee.property.name": "isDirectory"
    }
    assert(returnStatement.length && matchObj(returnStatement, returnStatementMatch),
      "it no worky")
  });
});