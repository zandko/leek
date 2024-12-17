import os

# 设置要排除的文件夹和文件类型
EXCLUDE_DIRS = {'node_modules', 'dist', '.git', '__pycache__', 'yarn.lock'}
INCLUDE_EXTENSIONS = {'.js', '.ts', '.py', '.html', '.css', '.java', '.ejs', '.prisma', '.json'}  # 可以根据需要添加或修改

def is_valid_file(filepath):
    """
    检查文件是否有效（符合条件的文件类型且不在排除的目录中）
    """
    # 判断文件扩展名
    _, ext = os.path.splitext(filepath)
    if ext not in INCLUDE_EXTENSIONS:
        return False
    return True

def count_lines_in_file(filepath):
    """
    统计文件的有效代码行数（忽略空行和注释行）
    """
    total_lines = 0
    comment_lines = 0
    empty_lines = 0

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                # 移除前后空白字符
                stripped_line = line.strip()
                if not stripped_line:
                    empty_lines += 1  # 空行
                elif stripped_line.startswith(('/*', '//', '#')):  # 处理注释行
                    comment_lines += 1
                else:
                    total_lines += 1  # 统计有效代码行
    except Exception as e:
        print(f"无法读取文件 {filepath}: {e}")

    return total_lines, empty_lines, comment_lines

def count_lines_in_project(root_dir):
    """
    递归遍历项目目录，统计所有符合条件的文件的代码行数
    """
    total_code_lines = 0
    total_empty_lines = 0
    total_comment_lines = 0
    total_files = 0

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 排除不需要的目录
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]

        for filename in filenames:
            filepath = os.path.join(dirpath, filename)

            if is_valid_file(filepath):
                total_files += 1
                code_lines, empty_lines, comment_lines = count_lines_in_file(filepath)
                total_code_lines += code_lines
                total_empty_lines += empty_lines
                total_comment_lines += comment_lines

    return total_files, total_code_lines, total_empty_lines, total_comment_lines

def main():
    # 设置项目根目录路径
    project_dir = input("请输入项目根目录路径: ").strip()

    if not os.path.isdir(project_dir):
        print(f"{project_dir} 不是有效的目录路径！")
        return

    total_files, total_code_lines, total_empty_lines, total_comment_lines = count_lines_in_project(project_dir)

    print(f"\n统计结果：")
    print(f"统计文件数: {total_files}")
    print(f"代码行数: {total_code_lines}")
    print(f"空行数: {total_empty_lines}")
    print(f"注释行数: {total_comment_lines}")

if __name__ == "__main__":
    main()
