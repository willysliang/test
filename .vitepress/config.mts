import { defineConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";

/**
 * 获取目录中的所有文件/目录
 * @param directoryPath 目录地址
 * @param isGetFile 是否获取文件名,还是获取文件夹名
 * @param prefix 拼接的 path 前缀
 * @returns {any[]}
 *
 * @description 注意：此结构仅限于两层结构
 */
const getDirectoryPathFileNames = (
  directoryPath,
  isGetFile = true,
  prefix = ""
) => {
  const files = fs.readdirSync(directoryPath);
  const result: (string | Record<string, string>)[] = [];

  // files 参数是包含文件名的数组
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    // 如果是目录，并且在规定的文件目录下，则插入结果
    if (stats.isDirectory()) {
      if (!isGetFile) result.push(file);
    } else if (isGetFile) {
      // 如果是文件，并且文件名以 md 结尾，则插入结果
      const curFileNames = file.split(".");
      if (file.endsWith(".md") && curFileNames.length >= 2) {
        const curFileName = curFileNames
          .slice(0, curFileNames.length - 1)
          .join("");

        result.push({
          filePath: `/${prefix}/${curFileName}`,
          fileName: curFileName,
        });
      }
    }
  });

  return result;
};

/**
 * 指定需要列出文件的目录
 * @param rootDirectoryPath 根目录地址
 * @returns {object} 返回目录的所有文件
 */
const getAllFile = (rootDirectoryPath) => {
  const rootFolder = getDirectoryPathFileNames(rootDirectoryPath, false);
  const allFile: any = {};
  rootFolder.forEach((folderName) => {
    const curFolderPath = path.join(rootDirectoryPath, folderName as string);
    const curFileNames = getDirectoryPathFileNames(
      curFolderPath,
      true,
      folderName as string
    );
    allFile[folderName as string] = curFileNames;
  });

  return allFile;
};

/**
 *
 * @param allFile 所有的文件
 * @returns {any[]} 返回所有导航项
 *
 * @description 逻辑分项
    1. 字符串类型
    2. 对象类型
    3. 数组类型
 */
const getAllNav = (allFile): any[] => {
  const allNav: any[] = [];

  for (const key in allFile) {
    const file = allFile[key];

    if (typeof file === "string") {
      // 字符串类型： '/bar/README.md'
      allNav.push(file);
    } else if (Array.isArray(file)) {
      // 数组类型： { text: '参考', items: [{ text: '组件', link: './a/b/' }] }
      const curItem = {
        text: key,
        items: [] as any[],
      };
      file.forEach((item) => {
        curItem.items.push({ text: item.fileName, link: item.filePath });
      });
      allNav.push(curItem);
    } else if (file && typeof file === "object") {
      // 对象类型：{ text: '指南', link: '/前端基础/ES6+语法' }
      allNav.push({ text: file.fileName, link: file.filePath });
    }
  }
  return allNav;
};

/** 仅获取 blog 目录目录下的文件 */
const rootDirectoryPath = path.join(__dirname, "../blog/");
const allFile = getAllFile(rootDirectoryPath);
const allNavs = getAllNav(allFile);
console.log("bbb", allNavs);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  srcDir: "./blog",
  base: "/test/",
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      ...allNavs,
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
